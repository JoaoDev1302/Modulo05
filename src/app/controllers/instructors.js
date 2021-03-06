const { age, date } = require('../../lib/utils')
const Instructor = require('../models/instructor')

module.exports = {
    index(req,res){
        Instructor.all(function(instructors) {
            return res.render("instructors/index",{ instructors })
        })
    },

    create(req,res){
        return res.render('instructors/create')

    },

    post(req,res){
        const keys = Object.keys(req.body)

        for(key of keys ){
            //  req.body.key == ""
            if(req.body[key] ==""){
                return res.send('Please, fill all fields')
            }
        }
        
        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`)
        })
    
        
    
    },

    show(req,res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })


        })

    },

    edit(req,res){
        return
    },

    put(req,res){
        const keys = Object.keys(req.body)

        for(key of keys ){
            //  req.body.key == ""
            if(req.body[key] ==""){
                return res.send('Please, fill all fields')
            }
        }

        return
    
    },

    delete(req,res){
        return
    }

}
