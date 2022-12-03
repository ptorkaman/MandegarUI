import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

class MultipleTranslateLoader implements TranslateLoader {

    constructor(private http: HttpClient, private resources: string[]) { }

    public getTranslation(lang: string): any {
        const version: string = environment.version.split('.').join('');

        return forkJoin(
            this.resources.map(
                file => {
                    return this.http.get(`assets/i18n/${lang}/${file}.json` + `?v=${version}`);
                }
            )
        ).pipe(
            map(
                response => {
                    return response.reduce(
                        (a, b) => {
                            return Object.assign(a, b);
                        }
                    );
                }
            )
        );
    }
}

export function MultipleTranslateLoaderFactory(http: HttpClient): MultipleTranslateLoader {
    return new MultipleTranslateLoader(http, [
        'pages',
        'public'
    ]);
}
