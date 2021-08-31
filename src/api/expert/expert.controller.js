import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ExpertService from './expert.service';
let ExpertServiceInstance = Container.get(ExpertService);

export default [];
