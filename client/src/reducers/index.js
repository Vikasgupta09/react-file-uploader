const INITIAL_STATE = {
  uploading: false,
  errorUploading: false,
  uploadProgress: 0,
  successfullUploaded: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FILE_UPLOAD_SUCCESS':
      return {
        ...state,
        uploading: false,
        errorUploading: false,
        successfullUploaded: true
      };
    case 'FILE_UPLOAD_FAIL':
      return { ...state, uploading: false, errorUploading: true };
    case 'FILE_UPLOAD_PROGRESS':
      return { ...state, uploading: true, uploadProgress: action.payload };
    case 'FILE_UPLOAD_RESET':
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
