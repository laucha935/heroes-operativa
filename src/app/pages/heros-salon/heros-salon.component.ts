/* =================================================
  Angular and rxjs imports
================================================= */
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, filter, first, take } from 'rxjs';
/* =================================================
  Angular Material
================================================= */
import { MatDialog } from '@angular/material/dialog';
/* =================================================
  Services
================================================= */
import { HerosService } from 'src/app/@shared/services/heros.service';
/* =================================================
  Components
================================================= */
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { HerosInfo } from 'src/app/@shared/interfaces/heros-info.interface';

@Component({
  selector: 'app-heros-salon',
  templateUrl: './heros-salon.component.html',
  styleUrls: ['./heros-salon.component.scss'],
})
export class HerosSalonComponent implements OnInit, OnDestroy {
  /* Services */
  private heroService: HerosService = inject(HerosService);
  private dialogService: MatDialog = inject(MatDialog);

  /* ui */

  herosInfo = signal<HerosInfo[]>([]);
  herosInfoAux = signal<HerosInfo[]>([]);
  searchByHero = signal<boolean>(true);
  searchHero = new FormControl('', Validators.minLength(3));
  randomDesc = 'This is a random description, where you can modify';
  showSearchButton = signal<boolean>(false);
  hero = 'hero';
  herosLength = 0;
  lastIndex = 0;
  private subscription = new Subscription();

  /* =================================================
                Lifecicles
================================================= */

  ngOnInit(): void {
    this.initHeroData();
    this.addHero();
    this.initInputSearchHero();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* =================================================
  Inits
================================================= */
  initInputSearchHero(): void {
    this.subscription.add(
      this.searchHero.valueChanges.subscribe((search: any) => {
        const lengthToSearch = this.searchByHero() ? 3 : 7;
        this.searchHero.setValidators(Validators.minLength(lengthToSearch));
        this.showSearchButton.set(this.searchHero.valid);
        if (search.length < lengthToSearch) {
          this.setHerosInfoPaged();
        }
      })
    );
  }

  initHeroData(): void {
    this.subscription.add(
      this.heroService.heros$
        .pipe(filter((data) => data.length > 0))
        .subscribe((data) => {
          this.herosInfo.set(
            data.map((elem: any) => {
              return {
                name: elem.name,
                description: elem?.description || this.randomDesc,
                photo: `${elem.thumbnail.path}.${elem.thumbnail.extension}`,
                id: elem.id,
              };
            })
          );
          this.herosLength = this.herosInfo().length;
          this.herosInfoAux.set(this.herosInfo());
          this.herosInfo.set(this.herosInfoAux().slice(0, 4));
        })
    );
  }

  /* =================================================
  Functions
================================================= */

  addHero(): void {
    this.subscription.add(
      this.heroService.addHero$.subscribe((data) => {
        if (data) {
          this.openEditdialog('add');
        }
      })
    );
  }

  filterHeros(): void {
    if (this.searchByHero()) {
      const searchItem = this.searchHero.value?.toLowerCase() || 'novalue';
      this.herosInfo.set(
        this.herosInfo().filter((elem) =>
          elem.name.toLowerCase().includes(searchItem)
        )
      );
    } else {
      this.herosInfo.set(
        this.herosInfo().filter(
          (elem) => elem.id.toString() === this.searchHero.value?.toString()
        )
      );
    }
  }

  onChangeRadioGroup(event: any): void {
    this.searchByHero.set(event.value === 'hero');
    this.showSearchButton.set(false);
  }

  onDeleteHero(hero: any): void {
    this.herosInfoAux.update((heroElem: any[]) => {
      const index = heroElem.findIndex((elem) => elem.id === hero.id);
      heroElem.splice(index, 1);
      return heroElem;
    });
    this.herosLength = this.herosInfoAux().length;
    this.setHerosInfoPaged();
  }

  onEmitterHeroCard(event: any): void {
    if (event.action && event.action === 'edit') {
      this.openEditdialog(event.action, event.heroInfo);
    } else {
      this.openDeleteDialog(event);
    }
  }
  /* =================================================
  Dialogs
================================================= */

  openEditdialog(action: string, hero?: any): void {
    const heroIdAux = hero?.id;
    const dialogRef = this.dialogService.open(HeroFormComponent, {
      data: {
        type: action,
        heroeInfo: hero,
      },
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.event === 'edit') {
          this.editHeroes(result, heroIdAux);
        } else {
          if (result?.event === 'add') {
            this.addHeroe(result.data);
          }
        }
      })
    );
  }

  openDeleteDialog(hero: any): void {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent);
    this.subscription.add(
      dialogRef.afterClosed().subscribe((data) => {
        if (data?.event === 'delete') {
          this.onDeleteHero(hero);
        }
      })
    );
  }

  editHeroes(result: any, heroIdAux: string): void {
    const form = result.data;
    const index = this.herosInfoAux().findIndex(
      (elem: any) => elem.id === heroIdAux
    );
    const heroInf = this.herosInfo()[index];
    this.herosInfoAux()[index] = {
      ...this.herosInfo()[index],
      name: form?.heroName || heroInf.name,
      description: form?.heroDescription || heroInf.description,
      id: form?.heroId || heroInf.id,
      photo: form?.heroPhoto || `${heroInf.photo}`,
    };
    this.setHerosInfoPaged();
  }

  addHeroe(newHero: any): void {
    const url: string = newHero.heroPhoto;
    this.herosInfoAux.update((heroElem: any[]) => {
      const hero = {
        name: newHero.heroName,
        description: newHero.heroDescription,
        id: newHero.heroId,
        photo: url,
      };
      heroElem.push(hero);
      return heroElem;
    });
    this.herosLength = this.herosInfoAux().length;
    this.setHerosInfoPaged();
  }

  pageEvent(event: any): void {
    this.lastIndex = event.pageIndex * 4;

    this.setHerosInfoPaged();
  }

  setHerosInfoPaged(): void {
    this.herosInfo.set(
      this.herosInfoAux().slice(this.lastIndex, this.lastIndex + 4)
    );
  }
}
