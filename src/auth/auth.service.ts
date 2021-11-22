import { AuthCredentialsDto } from './dto/auth-crendentials.dto';
import { UserRepository } from './user.respository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}


    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });
        if(user && await bcrypt.compare(password, user.password)) {
            return "success"
        }else{
            throw new UnauthorizedException('Invalid credentials');
        }
        
    }

}
