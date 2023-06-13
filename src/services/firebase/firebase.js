import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, increment, onSnapshot, query, updateDoc, where, doc, arrayUnion, getDoc, arrayRemove, deleteDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setInfo, setUser } from "../../features/user";
import { setAllPosts } from "../../features/allPosts";
import { setCurrentPost } from "../../features/currentPost";
import { setPostComments } from "../../features/postComments";
import { toast } from "react-toastify";
import { store } from "../../app/store";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Üye kaydetme
export const registerWithEmailAndPassword = async (email, password, confirmPassword) => {
    const validatePassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[.\-?!]).{8,}$/
    const validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    try {
        if (!email || !password || !confirmPassword) {
            toast.warning("Lütfen tüm alanları doldurunuz.", {
                autoClose: 1500
            })
            return false
        } else if (validateEmail.test(email) === false) {
            toast.warning("Lütfen geçerli bir e-posta adresi giriniz. ", {
                autoClose: 1500
            })
            return false
        } else if (password !== confirmPassword) {
            toast.warning("Şifreler eşleşmiyor, lütfen aynı şifreyi giriniz.", {
                autoClose: 1500
            })
            return false
        } else if (validatePassword.test(password) === false) {
            toast.warning("Parolanız en az 8 karakterden oluşmalı ve en az bir büyük harf, bir küçük harf ve bir özel karakter içermelidir.", {
                autoClose: 1500
            })
            return false
        } else {
            toast.success("Kayıt işlemi başarılı.", {
                autoClose: 1500
            })
            await createUserWithEmailAndPassword(auth, email, password);
            return true;
        }
    } catch (error) {
        const errorMessage = error.code;
        if (errorMessage === "auth/email-already-in-use") {
            toast.warning("E-posta adresi kullanımda .Lütfen başka bir e-posta adresi girin!", {
                autoClose: 1500
            })
            return false
        } else {
            toast.error(errorMessage)
            return false
        }
    }
};

// Üye girişi
export const loginWithEmailAndPassword = async (email, password) => {
    const validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    try {
        if (!email || !password) {
            toast.warning("Lütfen tüm alanları doldurunuz", {
                autoClose: 1500
            })
            return false
        } else if (validateEmail.test(email) === false) {
            toast.warning("Lütfen geçerli bir e-posta adresi giriniz. ", {
                autoClose: 1500
            })
            return false
        } else {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Başarıyla giriş yaptınız.", {
                autoClose: 1500
            })
            return true
        }
    } catch (error) {
        const errorMessage = error.code;
        if (errorMessage === "auth/wrong-password") {
            toast.warning("Yanlış şifre!", {
                autoClose: 1500
            })
            return false
        } else if (errorMessage === "auth/too-many-requests") {
            toast.warning("Çok fazla hatalı giriş yaptınız.", {
                autoClose: 1500
            })
            return false
        } else {
            toast.error(errorMessage)
            return false
        }
    }
}

// Üye çıkışı
export const logout = async () => {
    try {
        await signOut(auth).then(() => {
            toast.success("Başarıyla çıkış yaptınız.", {
                autoClose: 1500
            })
        })
        return null
    } catch (error) {
        const errorMessage = error.message
        toast.warning(errorMessage, {
            autoClose: 1500
        })
        toast.error(errorMessage)
    }
}

// Üye var mı yok mu kontrol etme
onAuthStateChanged(auth, (user) => {
    if (user) {
        let role = user.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL ? "admin" : "member"
        const uid = user.uid;
        const email = user.email;
        const userObj = {
            uid,
            email,
            role,
        }
        sessionStorage.setItem('user', JSON.stringify(userObj));
        store.dispatch(setUser(userObj));
    } else {
        sessionStorage.removeItem('user');
        store.dispatch(setUser(null));
    }
});

// Kullanıcının bilgileri ekleme varsa güncelleme
export const addAndUpdateUserInfo = async (fullName, birthday, gender, userId) => {
    try {
        if (userId) {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const updatedInfo = {};

                if (fullName !== undefined && fullName !== "") {
                    updatedInfo.fullName = fullName;
                }

                if (birthday !== undefined && birthday !== "") {
                    updatedInfo.birthday = birthday;
                }

                if (gender !== undefined && gender !== "") {
                    updatedInfo.gender = gender;
                }

                // Güncelleme yapmadan önce, her alanın değerinin tanımlı olduğundan emin olun
                if (Object.keys(updatedInfo).length > 0) {
                    await updateDoc(userRef, { ...updatedInfo, userId });
                }
            } else {
                console.log("User does not exist. Creating a new document...");

                const newUserInfo = {};

                if (fullName !== undefined && fullName !== "") {
                    newUserInfo.fullName = fullName;
                }

                if (birthday !== undefined && birthday !== "") {
                    newUserInfo.birthday = birthday;
                }

                if (gender !== undefined && gender !== "") {
                    newUserInfo.gender = gender;
                }

                await setDoc(userRef, { ...newUserInfo, userId });
            }
        } else {
            console.error("Error addAndUpdateUserInfo: User ID is missing");
        }
    } catch (error) {
        console.error("Error addAndUpdateUserInfo", error);
    }
};

// Mesaj gönderme


// Mesaj gönderme
let lastMessageTime = localStorage.getItem('lastMessageTime');
if (lastMessageTime) {
    lastMessageTime = new Date(lastMessageTime);
}

let remainingTime = 0; // Geri sayım süresi (saniye)

// Geri sayım süresini takip etmek için bir interval tanımla
let countdownInterval = null;

// Geri sayım süresi bittiğinde geri bildirimi kaldırmak ve interval'ı temizlemek için bir fonksiyon
const clearCountdown = () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    remainingTime = 0;
    localStorage.removeItem('lastMessageTime');
};

// Mesaj gönderme işlevi
export const sendMessage = async (messageInfo) => {
    try {
        const currentTime = new Date();

        if (lastMessageTime && currentTime - lastMessageTime < 5 * 60 * 1000) {
            // Eğer son mesajdan 5 dakika içinde yeni mesaj gönderilmeye çalışılıyorsa
            const timeDiff = 5 * 60 * 1000 - (currentTime - lastMessageTime);
            const remainingSeconds = Math.ceil(timeDiff / 1000);

            toast.warning(`5 dakika içinde tekrar mesaj gönderemezsiniz.Kalan süre: ${remainingSeconds} saniye.`, {
                autoClose: 1500
            });
            return false;
        }

        const { fullName, subject, content } = messageInfo;

        if (fullName.length === 0 || subject.length === 0 || content.length === 0) {
            toast.warning("Lütfen tüm alanları doldurun!", {
                autoClose: 1500
            });
            return false;
        } else {
            const message = {
                fullName: fullName,
                subject: subject,
                content: content,
                timestamp: currentTime.getTime(), // Mesajın zaman damgası
            };
            const docRef = await addDoc(collection(db, "messages"), message);
            toast.success("Mesajınız başarıyla iletilmiştir.", {
                autoClose: 1500
            });

            lastMessageTime = currentTime; // Son mesajın zamanını güncelle
            localStorage.setItem('lastMessageTime', lastMessageTime); // localStorage'a kaydet

            // Geri sayım süresini başlat
            remainingTime = 5 * 60; // 5 dakika
            countdownInterval = setInterval(() => {
                remainingTime--;
                if (remainingTime <= 0) {
                    clearCountdown();
                }
            }, 1000);
            return true
        }
    } catch (error) {
        console.log("sendMessage", error);
    }
};

// ID ye göre kullanıcının bilgilerini getirme
export const getUserById = (userId) => {
    try {
        const userRef = doc(db, "users", userId);

        return onSnapshot(userRef, (userDoc) => {
            if (userDoc.exists()) {
                const userInfo = userDoc.data();
                store.dispatch(setInfo(userInfo)); // setInfo eylemini tetikle ve userInfo'yi geç
            } else {
                store.dispatch(setInfo({})); // Kullanıcı belgesi yoksa boş bir obje olarak ayarla
            }
        }, (error) => {
            console.error("Error getUserById", error);
            store.dispatch(setInfo(null)); // Hata durumunda setInfo'yu null olarak ayarla
        });
    } catch (error) {
        console.error("Error getUserById", error);
        return null;
    }
};

// Kullanıcı fotoğrafı ekleme-güncelleme
export const addUserImage = async (id, image) => {
    if (!image) {
        return; // Eğer image boşsa, güncelleme yapma
    }

    const imageRef = ref(storage, `user-images/${id}`);
    try {
        await getDownloadURL(imageRef);

        // ID'ye ait bir resim zaten varsa, resmi güncelle
        await deleteObject(imageRef); // Önceki resmi sil
        await uploadBytes(imageRef, image); // Yeni resmi yükle
    } catch (error) {
        if (error.code === "storage/object-not-found") {
            // ID'ye ait bir resim yoksa, yeni resmi ekle
            await uploadBytes(imageRef, image);
        } else {
            console.error("Error addUserImage", error);
        }
    }
};

//Firebase storage dan postun fotoğrafını getirme

export const getUserImage = async (id) => {
    try {
        const imageRef = ref(storage, `user-images/${id}`);
        const imageURL = await getDownloadURL(imageRef);
        return imageURL;
    } catch (error) {
        return null;
    }
};

// Posta ait yorum sayısını getirme 
export const getPostCommentCount = async (postId) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "comments"), where("postId", "==", postId)));
        const commentsCount = querySnapshot.size;
        return commentsCount;
    } catch (error) {
        console.error("Error getting comments", error);
        return 0;
    }
};


// Post ekleme
export const addPost = async (post, user) => {
    const date = new Date();
    try {
        if (user.role === "admin") {
            await addDoc(collection(db, "posts"), {
                postId: post.id,
                postTitle: post.title.toLowerCase(),
                content: post.content,
                author: "Halil Can Cengiz",
                category: post.category.toLowerCase(),
                createdAt: String(date),
                metaDescription: post.metaDescription,
                readingCount: 0
            });
        } else {
            throw new Error("User is not authorized to add post");
        }
    } catch (error) {
        console.error("Error addPost", error);
    }
};
// Tüm postları getirme 
export const getPosts = async () => {
    try {
        const postsCollection = collection(db, "posts");
        onSnapshot(postsCollection, (snapshot) => {
            const posts = snapshot.docs.map((doc) => doc.data());
            const sortedPost = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            store.dispatch(setAllPosts(sortedPost));
        });
    } catch (error) {
        console.error("Error getPosts", error);
    }
};

// Tüm Kullanıcıların bilgilerini getirme
export const getAllUsersInfo = () => {
    return new Promise((resolve, reject) => {
        try {
            const usersCollection = collection(db, "users");
            const users = [];

            onSnapshot(usersCollection, (snapshot) => {
                snapshot.forEach((doc) => {
                    users.push(doc.data());
                });

                resolve(users);
            });
        } catch (error) {
            console.error("Error getAllUsersInfo", error);
            reject(error);
        }
    });
}


// Id ye göre postu getirme
export const getPostById = async (title) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "posts"), where("postTitle", "==", title.replace(/-/g, ' '))));
        const post = querySnapshot.docs.map((doc) => doc.data())[0];
        store.dispatch(setCurrentPost(post));
    } catch (error) {
        toast.error(`getPostById ${error}`);
    }
};

//Firebase storage a postun fotoğrafını ekleme
export const addPostImageToStorage = async (id, image) => {
    const imageRef = ref(storage, `posts-images/${id}`);
    try {
        await uploadBytes(imageRef, image);
    } catch (error) {
        console.error("Error addPostImageToStorage", error);
    }
};

//Firebase storage dan postun fotoğrafını getirme
export const getPostImageFromStorage = async (id) => {
    try {
        const imageRef = ref(storage, `posts-images/${id}`)
        let imageURL = ""
        await getDownloadURL(imageRef).then((result) => {
            imageURL = result
        })
        return imageURL
    } catch (error) {
        console.error("Error getPostImageFromStorage", error)
        return ""
    }
}

//Postun okunma sayısını güncelleme(arttırma)
export const updateReadingCount = async (postId) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "posts"), where("postId", "==", postId)));
        querySnapshot.forEach(async (item) => {
            await updateDoc(doc(db, "posts", item.id), {
                "readingCount": increment(1)
            });
        })
    } catch (error) {
        console.error("Belge alanını güncellerken hata oluştu: ", error);
    }
};

//Yorum ekleme
export const addComment = async (user, commentContent, postId, author) => {
    const date = new Date();
    try {
        if (user && author !== "default") {
            await addDoc(collection(db, "comments"), {
                postId,
                author,
                userId: user.uid,
                createdAt: String(date),
                content: commentContent,
                replies: [],
                likes: [],
                dislikes: [],
                role: user.role
            });
        } else {
            toast.error("Lütfen kullanıcı bilgilerini ayarlardan güncelleyin.");
        }
    } catch (error) {
        console.error("Error addComment", error);
    }
}

//Yorum güncelleme
export const updateComment = async (commentId, content) => {
    const date = new Date()
    try {
        await updateDoc(doc(db, "comments", commentId), {
            content,
            updatedAt: String(date)
        });
    } catch (error) {
        toast.error(error.message)
    }
}

//Yorum silme
export const deleteComment = async (commentId) => {
    try {
        await deleteDoc(doc(db, "comments", commentId));
    } catch (error) {
        toast.error(error.message)
    }
}

//Cevap ekleme
export const addReply = async (commentId, userId, content, replyId, author) => {
    const date = new Date();
    if (!author) {
        toast.warning("Lütfen bilgilerinizi ayarlardan güncelleyin !")
        return null
    }
    try {
        await updateDoc(doc(db, "comments", commentId), {
            replies: arrayUnion({ author, content, replyId, createdAt: String(date), userId })
        }
        )
    } catch (error) {
        toast.error(error.message)
    }
}

//Cevap güncelleme
export const updateReply = async (commentId, reply, updatedContent) => {
    try {
        const docRef = doc(db, "comments", commentId);
        const docSnapshot = await getDoc(docRef);
        const updatedAt = new Date(); // Güncelleme zamanını al

        if (docSnapshot.exists()) {
            const commentData = docSnapshot.data();
            const replies = commentData.replies || [];

            const updatedReplies = replies.map((currentReply) => {
                if (currentReply.replyId === reply.replyId) {
                    return { ...currentReply, content: updatedContent, updatedAt: String(updatedAt) }; // updatedAt alanını güncelle
                }
                return currentReply;
            });

            await updateDoc(docRef, { replies: updatedReplies });

        } else {
            throw new Error("Belirtilen belge bulunamadı.");
        }
    } catch (error) {
        toast.error(error.message);
    }
};


//Cevap silme
export const deleteReply = async (commentId, replyDetail) => {
    try {
        await updateDoc(doc(db, "comments", commentId), {
            replies: arrayRemove(replyDetail)
        });
    } catch (error) {
        toast.error(error.message)
    }
}

// Gönderiye ait tüm yorumları getirme
export const getAllCommentsForPost = async (postId) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "comments"), where("postId", "==", postId)));
        const comments = querySnapshot.docs.map((doc) => {
            const commentData = doc.data();
            return { ...commentData, commentId: doc.id };
        });

        onSnapshot(query(collection(db, "comments"), where("postId", "==", postId)), (snapshot) => {
            const updatedComments = snapshot.docs.map((doc) => {
                const updatedCommentData = doc.data();
                return { ...updatedCommentData, commentId: doc.id };
            });
            store.dispatch(setPostComments(updatedComments));
        });

    } catch (error) {
        toast.error(`getAllCommentsForPost: ${error}`);
        return [];
    }
};

// Yoruma aksiyon ekleme (like,funny,informative,awesome) veya güncelleme 
export const addLike = async (commentId, userId, type) => {
    try {
        const commentRef = doc(db, "comments", commentId);
        const commentSnapshot = await getDoc(commentRef);

        const commentData = commentSnapshot.data();
        const likes = commentData.likes || [];

        // Kontrol işlemi
        const userIndex = likes.findIndex(like => like.userId === userId);
        if (userIndex !== -1) {
            // Kullanıcının beğenisi zaten varsa güncelle
            likes[userIndex].type = type;
        } else {
            // Kullanıcının beğenisi yoksa ekle
            likes.push({ userId, type });
        }

        await updateDoc(commentRef, { likes });
    } catch (error) {
        toast.error(error.message);
    }
};

// Yorumdan aksiyon kaldırma (like,funny,informative,awesome) kaldırma
export const removeLike = async (commentId, userId, type) => {
    try {
        await updateDoc(doc(db, "comments", commentId), {
            likes: arrayRemove({ id: userId, type })
        });
    } catch (error) {
        toast.error(error.message)
    }
};

