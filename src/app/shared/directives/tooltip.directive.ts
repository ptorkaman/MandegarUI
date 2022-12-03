
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {

    @Input() appTooltip: string;

    constructor(private element: ElementRef, private translateService: TranslateService) { }

    ngOnInit(): void {
        this.translateService.get(this.appTooltip.split(',')).subscribe(
            data => {
                const arr: string[] = Object.keys(data).map(
                    val => {
                        return val;
                    }
                );

                let tipTitle: string = '';
                let tipContent: string = '';

                if (arr.length === 1) {
                    tipContent = data[arr[0]];
                } else if (arr.length === 2) {
                    tipTitle = data[arr[0]];
                    tipContent = data[arr[1]];
                }

                $(this.element.nativeElement).popover({
                    title: tipTitle,
                    content: tipContent,
                    html: true,
                    trigger: 'hover',
                    delay: { show: 100, hide: 100 },
                    sanitize: false,
                    sanitizeFn: content => content
                });
            }
        );
    }
}
