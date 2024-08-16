const twilio = require('twilio');
const accountSid = 'ACa3bd7fa7f3cc8d02fa77803be95607ad'; // Replace with your Twilio account SID
const authToken = '854ff1e1bde93c33b149ec404f470537';   // Replace with your Twilio Auth Token

const client = new twilio(accountSid, authToken);

const fromNumber = '+12515511081'; // Replace with your Twilio phone number
const toNumber = '+918109543070';     // Replace with your phone number

//const audioUrl = 'http://example.com/audio.mp3'; // Replace with the URL of your audio file
const interviewLink = 'http://example.com/interview'; // Replace with your personalized interview link

client.calls.create({
  to: toNumber,
  from: fromNumber,
  twiml: `<Response>
           <Say> Enter press 1 </Say>
            <Gather action="https://vtr-8vir.onrender.com/handle-key" method="POST">
            </Gather>
            <Say>We didn't receive any input. Goodbye!</Say>
          </Response>`,
  timeout: 15,

})
.then(call => console.log(`Call SID: ${call.sid}`))
.catch(error => console.error(error));

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.post('/handle-key', (req, res) => {
  const digit = req.body.Digits;
  console.log(digit);

  if (digit === '1') {
    res.send(`<Response>
                <Say>Here's your interview link: ${interviewLink}</Say>
              </Response>`);
  } else {
    res.send(`<Response>
                <Say>Invalid input. Goodbye!</Say>
              </Response>`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
