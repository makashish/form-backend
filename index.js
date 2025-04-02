require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const JobSchema = new mongoose.Schema({ title: String, description: String, company: String });
const Job = mongoose.model('Job', JobSchema);

app.post('/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.send(job);
});

app.get('/jobs', async (req, res) => {
  res.send(await Job.find());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));