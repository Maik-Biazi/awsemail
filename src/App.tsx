import React from 'react';

import './App.css';
import { SES } from 'aws-sdk';


function App() {

  const ses = new SES({
    accessKeyId: 'AKIAYURVOFAAITGTYWHJ',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

  async function sendEmail(to: string, subject: string, message: string) {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: 'maikwilliam4553@gmail.com', // endereço do remetente
    };

    try {
      const result = await ses.sendEmail(params).promise();
      console.log(result);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function handleSendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const to = (event.target as any).to.value;
    const subject = (event.target as any).subject.value;
    const message = (event.target as any).message.value;
    

    sendEmail(to, subject, message);
  }
  return (
    <form onSubmit={handleSendEmail}>
      <label>
        To:
        <input type="email" name="to" required />
      </label>
      <label>
        Subject:
        <input type="text" name="subject" required />
      </label>
      <label>
        Message:
        <textarea name="message" required />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}

export default App;
