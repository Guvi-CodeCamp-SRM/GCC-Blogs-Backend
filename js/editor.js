const blogTitleField = document.querySelector('.title');
const artField = document.querySelector('.article');

const bannerimg = document.querySelector('#banner-upload');
const banner=document.querySelector('.banner');

let bannerPath;

const publishBtn = document.querySelector('.publish-btn');

const uploadInput = document.querySelector('#imgage-upload');

bannerimg.addEventListener('change',()=>{
    uploadImage(bannerimg,"banner");
})

uploadInput.addEventListener('change',()=>{
    uploadImage(uploadInput,"image");
})
const uploadImage =(uploadFile,uploadType)=>{
    const [file]=uploadFile.files;
    if(file && file.type.include("image")){
        const formdata = new FormData();
        formdata.append('image',file);
        
        fetch('/upload',{
            method:'post',
            body: formdata
        }).then(res =>res.json()).then(data =>{
            if(uploadType=="image"){
                addImage(data,file.name);

            }
            else{
                bannerPath = `${location.origin}/${data}`;
            banner.getElementsByClassName.backgroundImage =`url("{bannerPath}")`;

            }
            
        })
    }
    else{
        alert("Upload Images only");
    }
}

const addImage =(imagepath,alt)=>{

    let curPos = artField.selectionStart;
    let textToInsert=`\r![${alt}](${imagepath})\r`;
    artField.value = artField.value.slice(0,curPos)+ textToInsert + artField.value.slice(curPos);  
}

let months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
publishBtn.addEventListener('click',()=>{
    if(artField.value.length && blogTitle.value.length){

        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id ='';
        for(let i=0;i<4;i++){
            id += letters[Math.floor(Math.random()*letters.length)];
        }
        let docName = `${blogTitle}-${id}`;
        let date = new Date();

        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: artField.value,
            bannerimg: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }).then(()=>{
            location.href=`/${docName}`;
        }).catch((err)=>{
            console.error(err)
        })
    }
})