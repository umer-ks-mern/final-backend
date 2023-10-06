
import multer from "multer";


    const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,'../public/posts')
      },
      filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
      }
    })
  
  
   
  

const upload = multer({storage})
export default upload;