import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import EstimateService from './estimate.service';
let EstimateServiceInstance = Container.get(EstimateService);

export default [];
