export const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
export const getIntials=(name)=>{
    if(!name)return "";
    const words=name.split("");
    let inital="";
    for(let i=0;i<Math.min(words.length,2);i++){
        inital+=words[i][0]
    }
    return inital.toUpperCase()
}