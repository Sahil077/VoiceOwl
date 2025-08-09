require('dotenv').config()
const mongoose = require("mongoose");
mongoose.pluralize(null);


mongoose.set("strictQuery", true);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aja61.mongodb.net/voiceOwl?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
.then(() => console.log("MongoDB connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

const audioSchema = new mongoose.Schema({
    audioUrl: String,
    transcription: String,
    created_at: Date,
})

const TranscriptionInfo = mongoose.model("transcriptionInfo", audioSchema);



module.exports = function (app) {

    app.post('/transcription', async function (req, res) {
        const audioUrl = req.body.audioUrl;
        console.log('au ', audioUrl)
        if (!audioUrl) {
            return res.status(400).json({ error: 'audioUrl is required' });
        }

        try {

            const dummyTranscription = 'transcribed text';

            const transcriptionRecord = new TranscriptionInfo({
                audioUrl,
                transcription: dummyTranscription,
                created_at: new Date()
            })

            await transcriptionRecord.save();

            res.json({ _id: transcriptionRecord._id });

        }
         catch (err){
            return res.status(500).json({ error: 'Something went worng!' })
         }
    })


    app.get('/transcriptions', async (req, res) => {
        try {
            const records = await TranscriptionInfo.find().sort({ created_at: -1 });
            res.json(records);
        }
        catch(err) {
            res.status(500).json({ error: 'Something went worng!' })
        }
    });


    app.get('/', (req, res) => {
        res.render('audio_upload')
    })
   
}
