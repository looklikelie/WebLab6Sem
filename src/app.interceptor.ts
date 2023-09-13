import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from "rxjs";

export interface Response {
    dataTime: number;
}

@Injectable()
export class AppInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {

        const now = Date.now();
        let i=0;
        return next
            .handle()
            .pipe(map((data) => { return {...data, dataTime: Date.now() - now} } ));
    }
}