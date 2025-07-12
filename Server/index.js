const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const UserList = require("./Schema/schema");
const FormList = require("./Schema/form");
const Response = require("./Schema/response");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Eco server is running");
    app.listen(PORT, () =>
      console.log(`Eco Server Runing on: http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Err", err));

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserList.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserList({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserList.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/save-form", async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new FormList(formData);
    await newForm.save();
    res.status(201).json({ message: "Form saved successfully", form: newForm });
  } catch (error) {
    console.error("Form saving error:", error);
    res.status(500).json({ error: "Failed to save form" });
  }
});
app.get("/forms", async (req, res) => {
  try {
    const forms = await FormList.find({});
    res.json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});
app.get("/forms/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const forms = await FormList.find({ email });
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms by email:", error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});

app.get("/form/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const form = await FormList.findById(id);
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form by id:", error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
});
app.delete("/delete-form/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FormList.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: "Failed to delete form" });
  }
});
app.post("/response", async (req, res) => {
  try {
    const newResponse = new Response(req.body);
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    console.error("Error saving form response:", error);
    res.status(500).json({
      message: "Server error.",
      error: error.message,
      stack: error.stack,
    });
  }
});
app.get("/responses-by-owner/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const forms = await FormList.find({ email });
    if (!forms || forms.length === 0) {
      return res
        .status(404)
        .json({ message: "No forms found for this email." });
    }
    const formIds = forms.map((form) => form._id.toString());
    const responses = await Response.find({ formId: { $in: formIds } });
    res.status(200).json({
      ownerEmail: email,
      totalForms: forms.length,
      totalResponses: responses.length,
      forms,
      responses,
    });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ message: "Server error" });
  }
});
