import {envir_Status} from '../store/types.js';
if (envir_Status.value){
  module.exports={
    NAVIGATOR_ENV_VERSION:'release'
  }
}else{
  module.exports = {
    NAVIGATOR_ENV_VERSION: 'develop'
  }

}