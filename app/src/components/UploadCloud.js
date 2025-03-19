import axios from "axios";

const uploadToCloud = async () => {
  try {
    // Step 1: Send a POST request to http://localhost:5000/upload
    const uploadResponse = await axios.post('http://localhost:5000/upload');
    console.log(uploadResponse);

    if (uploadResponse.status === 200) {
      // Step 2: Send a GET request to http://localhost:5000/tfidf
      const tfidfResponse = await axios.get('http://localhost:5000/tfidf');
      const tfidfmodel = JSON.stringify(tfidfResponse.data);
      console.log("GOT TFIDF ");
      console.log(tfidfmodel);

      // Step 3: Send a POST request to http://localhost:8080/inverted-index/post-index with the tfidfmodel
      const postIndexResponse = await axios.post('http://localhost:8080/inverted-index/post-index', { index: tfidfmodel });

      if (postIndexResponse.status === 200) {
        console.log('File uploaded to cloud and indexed successfully!');
      } else {
        console.log('Failed to index file in cloud.');
      }
    } else {
      console.log('Failed to upload file to cloud.');
    }
  } catch (error) {
    console.error('Error uploading file to cloud:', error);
    console.log(`Error uploading file to cloud: ${error.message}`);
  }
};


//uploadToCloud();
// ✅ Export the function correctly (without calling it)
export default uploadToCloud;
