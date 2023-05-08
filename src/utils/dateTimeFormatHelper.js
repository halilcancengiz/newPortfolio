export const dateTimeFormat = (date)=>{
    const dateTimeFormat = new Intl.DateTimeFormat('tr-TR', { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
      });
      return dateTimeFormat.format(new Date(date))
}