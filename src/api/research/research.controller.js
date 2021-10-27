import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ResearchService from './research.service';
let ResearchServiceInstance = Container.get(ResearchService);

export default [];
