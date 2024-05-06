import pkg from 'pg';
const { Pool } = pkg;

const client = new Pool({
    user:"postgres",
    host:"localhost",
    database:"dashboard",
    password:"",
    port:5432
})

const userInsert = async(data) =>{
     return new Promise((resolve,reject)=>{
         const {username,email,gender,password} = data;
         client.query(`INSERT INTO user (username,email,gender,password) VALUES ($1,$2,$3,$4)`,
         [username,email,gender,password],
         (error,result)=>{
            if(error){
                reject(error)
            }
            if(result && result.rows){
                resolve(`new user added ${JSON.stringify(result.rows[0])}`)
            }
            else{
                reject(new Error("no result found"))
            }
         }
         );
     });
};

const getUser = async() =>{
    try{
         return await new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM user`,
            (error,result)=>{
                if(error){
                    reject(error)
                }
                if(result && result.rows){
                    resolve(result.rows)
                }
                else{
                    reject(new Error("no rows"))
                }
            }
            );
        });
    }
    catch(error1){
      console.error(error1)
      throw new Error("Internal server error");
    }
};

const userLogin = (data) =>{
    try{

        return new Promise((resolve,reject)=>{
            const {email,password}=data;
            client.query(`SELECT * FROM user WHERE email=$1 AND password=$2`,[email,password],
            (error,result)=>{
                if(error){
                    reject(error)
                }
                if(result.rowCount>0){
                    resolve(`login successful ${JSON.stringify(result.rows[0])}`)
                }
                else{
                    reject("login failed or User not Registered ")
                }
            }
            )
        })
    }
    catch(error2){
        console.error(error2);
        throw new Error("Internal server error")
    }
}
//  module.exports={
//     userInsert: userInsert,
//     getUser:getUser,
//     userLogin:userLogin
// };
export default userInsert;


