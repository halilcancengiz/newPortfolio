import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { store } from "../../app/store";
import { setUser } from "../../features/user";
import { addDoc, collection, getDocs, getFirestore, increment, onSnapshot, query, updateDoc, where, doc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { setAllPosts } from "../../features/allPosts";
import { setCurrentPost } from "../../features/currentPost";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setPostComments } from "../../features/postComments";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
export const logout = () => {
    try {
        signOut(auth).then(() => {
            toast.success("Başarıyla çıkış yaptınız.", {
                autoClose: 1500
            })
        })
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
                comments: [],
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
            store.dispatch(setAllPosts(posts));
        });
    } catch (error) {
        console.error("Error getPosts", error);
    }
};

// id ye göre postu getirme
export const getPostById = async (title) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "posts"), where("postTitle", "==", title.replace(/-/g, ' '))));
        const post = querySnapshot.docs.map((doc) => doc.data())[0];
        store.dispatch(setCurrentPost(post));
    } catch (error) {
        toast.error(`getPostById ${error}`);
    }
};

// storage a postun fotoğrafını ekleme
export const addPostImageToStorage = async (id, image) => {
    const imageRef = ref(storage, `posts-images/${id}`);
    try {
        await uploadBytes(imageRef, image);
    } catch (error) {
        console.error("Error addPostImageToStorage", error);
    }
};

// storage dan postun fotoğrafını getirme
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

// postun okunma sayısını güncelleme(arttırma)
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


export const addComment = async (user, commentContent, postId) => {
    const date = new Date();
    try {
        if (user) {
            await addDoc(collection(db, "comments"), {
                postId,
                author: user.uid,
                createdAt: String(date),
                content: commentContent,
                replies: [],
                likes: [],
                dislikes: [],
                role: user.role
            });
        } else {
            throw new Error("User is not authorized to add comment");
        }
    } catch (error) {
        console.error("Error addComment", error);
    }
}

export const updateComment = () => {
    try {

    } catch (error) {

    }
}

export const deleteComment = () => {
    try {

    } catch (error) {

    }
}

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

export const addLike = async (commentId, userId, type) => {
    try {
        const commentRef = doc(db, "comments", commentId);
        const commentSnapshot = await getDoc(commentRef);

        const commentData = commentSnapshot.data();
        const likes = commentData.likes || [];

        // Kontrol işlemi
        const userIndex = likes.findIndex(like => like.id === userId);
        if (userIndex !== -1) {
            // Kullanıcının beğenisi zaten varsa güncelle
            likes[userIndex].type = type;
        } else {
            // Kullanıcının beğenisi yoksa ekle
            likes.push({ id: userId, type });
        }

        await updateDoc(commentRef, { likes });
    } catch (error) {
        toast.error(error.message);
    }
};
export const removeLike = async (commentId, userId, type) => {
    try {
        await updateDoc(doc(db, "comments", commentId), {
            likes: arrayRemove({ id: userId, type })
        });
    } catch (error) {
        toast.error(error.message)
    }
};

