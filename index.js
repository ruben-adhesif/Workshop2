const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZWZjOTdlNC1kYzllLTRkZWQtYTI1Yi0zNmM2OTczZTE2M2UiLCJlbWFpbCI6InJ1YmVuY2FwcEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTNhOGY2ODQ0M2M2ZjMyMjEzOTUiLCJzY29wZWRLZXlTZWNyZXQiOiIyMzIwNGI3Y2Q4MWExNjdhNmQ1NTVhZjJjNDJmMjcyY2RiZmQ0NDU0NzExN2Q4NjA0Mzc3MzFhZTk1NjVmYTMxIiwiaWF0IjoxNzA3MTQxMDgwfQ.f6xnB3r68cfZB2psSmdVqKipOMOHn3jC8QoH1C2ui2M"

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = ".\ressources\IPFS-command.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}

pinFileToIPFS()