import {nanoid} from 'nanoid'

class Course {
    constructor(id,{
        courseName,category,price,language,email,TeachingAssists
    }){
        this.id =id
        this.courseName = courseName
        this.category = category
        this.price = price
        this.language = language
        this.email = email
        this.TeachingAssists = TeachingAssists
    }
}

const courseholder = {}

const resolvers = {
    getCourse: ({id}) =>{
        return new Course(id,courseholderi[id])
    },
    createCourse: ({input}) =>{
        let id = nanoid()
        courseholder[id] = input
        return new Course(id,input)
    }
}
export default resolvers;