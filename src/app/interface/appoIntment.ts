import { User } from './user';
import { Pet } from './pet';
import { Service } from './service';
export interface AppoIntment{

    appointmentid : number,
    appointmentDate: Date,
    petId: Pet,
    serviceId: Service,
    appointmentUser: User
    
}