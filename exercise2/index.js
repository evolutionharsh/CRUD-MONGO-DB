const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const  courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course',  courseSchema);

async function getCourses() {
  return await Course
 .find({ isPublished: true })
 .or([{tags: 'frontend'},{tags: 'backend'}])
 .sort('-price')
 .select('name author price');
}

async function run() {
 const courses= await getCourses();
 console.log(courses);
}
async function updateCourse(id) {
    const course = await  Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another Author';
   /* course.set({
     isPublished: true,
     author: 'Another Author'
  
  
    });*/
    const result = await course.save();
    console.log(result);
  }
  updateCourse('5a68fde3f09ad7646ddec17e');
  //updateCourse();

run();