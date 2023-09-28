import Joi from "joi";

const postValidator={
    create : (req, res, next)=>{
        const schema = Joi.object({
          caption: Joi.string().min(3).max(255).required(),

          user_id: Joi.string().alphanum().required(),
        });

        const{error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message});
        }

        next();
    },
};

export default postValidator;