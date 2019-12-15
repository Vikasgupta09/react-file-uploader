import API from '../apis/fileUpload';
// Redux actions

// To upload file on the server
export const uploadFile = file => async dispatch => {
  let data = new FormData();
  data.append('file', file, file.name);

  let uploadProgresObj = {};
  uploadProgresObj[file.name] = {
    percentage: 0
  };

  await API.post('/upload', data, {
    onUploadProgress: function(progressEvent) {
      const totalLength = progressEvent.total;
      if (totalLength !== null) {
        let progressPercentage = Math.round(
          (progressEvent.loaded * 100) / totalLength
        );
        uploadProgresObj[file.name].percentage = progressPercentage;
        dispatch({
          type: 'FILE_UPLOAD_PROGRESS',
          payload: progressPercentage
        });
      }
    }
  })
    .then(response => dispatch(_uploadSuccess(response)))
    .catch(error => dispatch(_uploadFail(error)));
};

// On upload file success, dispatch event
const _uploadSuccess = ({ data }) => {
  return {
    type: 'FILE_UPLOAD_SUCCESS',
    payload: data
  };
};

// On upload file failure, dispatch event
const _uploadFail = error => {
  return {
    type: 'FILE_UPLOAD_FAIL',
    payload: error
  };
};

// On reset file, dispatch event after clean /clean on server
// helpful to clean space on server
export const resetFileUpload = () => dispatch => {
  API.post('/clean', {});
  dispatch({
    type: 'FILE_UPLOAD_RESET'
  });
}