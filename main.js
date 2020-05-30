const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens)
{

    if(err)
    {
        console.log(err);
        return;
    }
    else
    {
        console.log('Connected!');
        gsrun(client);
    }

});

async function gsrun(cl)
{
    const gsapi = google.sheets({version:'v4', auth: cl});

    const opt =  {
        spreadsheetId:'11vrXMrdX_5kXf1u3cu51qiHEjEjPQtdpEAptFLqzrno',
        range: 'Sheet1!A1:E6',

    };

    let received_data = await gsapi.spreadsheets.values.get(opt);
    console.log(received_data.data.values);
}