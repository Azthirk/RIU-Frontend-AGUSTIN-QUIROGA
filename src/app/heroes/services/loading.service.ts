import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    #isLoading = signal(false);
    isLoading = computed(() => this.#isLoading());

    show(){
        this.#isLoading.set(true);
    }

    hide(){
        this.#isLoading.set(false);
    }
}
