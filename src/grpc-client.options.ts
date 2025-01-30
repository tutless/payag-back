import {GrpcOptions, Transport} from '@nestjs/microservices';
import { join } from 'path';
import {ReflectionService} from '@grpc/reflection';





export const grpcClientOptions:GrpcOptions = {
    transport:Transport.GRPC,
    options:{
        package:'payag',
        protoPath: join(__dirname, '../protos/payag.proto'),
        onLoadPackageDefinition: (pkg,server) => {
            new ReflectionService(pkg).addToServer(server)
        },
        url: 'localhost:51150',

        
    }

}