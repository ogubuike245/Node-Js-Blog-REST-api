import moment from "moment";
import Blog from "../models/blogModel.js";

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

export const getAllBlogs = (request, response) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      response.render("index", {
        blogs: result,
        title: "All blogs",
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//FIXME: FETCH DETAILS OF A SINGLE BLOG FROM THE MONGODB DATABASE
export const getDetailsOfSingleBlog = (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((result) => {
      response.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      response.render("404", { title: "Blog not found" });
    });
};

//FIXME: GO TO THE PAGE THAT DISPLAYS THE FORM TO CREATE A NEW BLOG DOCUMENT TO THE MONGODB DATABASE
export const createNewBlogPage = (request, response) => {
  response.render("create", { title: "Create a new blog" });
};

//FIXME: GO TO THE PAGE THAT DISPLAYS THE FORM TO EDIT AN EXISTING BLOG DOCUMENT FROM THE MONGODB DATABASE
export const editBlogPage = (request, response) => {
  const id = request.params.id;
  Blog.findById(id).then((result) => {
    response.render("edit", { blog: result, title: "Edit Blog" });
  });
};

//POST ROUTES CONTROLLERS

//FIXME: CREATE A NEW BLOG DOCUMENT TO THE MONGODB DATABASE
export const createNewBlogPost = (request, response) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then((result) => {
      response.redirect("/api/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

//FIXME: EDIT A SINGLE BLOG POST DOCUMENT
export const editSingleBlogPost = async (request, response) => {
  const { id } = request.params;
  console.log(request.body);

  await Blog.findByIdAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  )
    .then((result) => {
      console.log(result.title);
      response.redirect("/api/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
};

//DELETE ROUTES CONTROLLERS
//FIXME: DELETE A BLOG DOCUMENT FROM THE MONGODB DATABASE

export const deleteBlog = async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id)
    .then((result) => {
      response.json({ redirect: "/api/blogs" });
      // console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};