import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ExpertFieldService from './expert.field.service';
let ExpertFieldServiceInstance = Container.get(ExpertFieldService);

export default [];
