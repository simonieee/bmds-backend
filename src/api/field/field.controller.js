import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import FieldService from './field.service';
let FieldServiceInstance = Container.get(FieldService);

export default [];
