import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { api } from "../model/api";

const apiData: api = new api();
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    console.log('authInterceptor (lazy scope)');

    // Setting a dummy token for demonstration
    const headers = req.headers
                    .append('Content-Type','application/json')
                    .append('Authorization','Basic ' + btoa(apiData.USER));;
    req = req.clone({headers});

    return next(req).pipe(
        tap(resp => console.log('response', resp))
    );

    // const authService = inject(AuthService);
    // const snackBar = inject(MatSnackBar);

    // const clonedRequest = req.clone({
    //     setHeaders: {
    //     'x-access-token': this.authService.getToken(),
    //     },
    // });

    // return next(clonedRequest).pipe(
    //     catchError((error) => {
    //     snackBar.open('Ops, houve um erro', 'Fechar', {
    //         duration: 5000,
    //     });
    //     return throwError(() => error);
    //     })
    // );
}