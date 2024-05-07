import { Component, OnInit, inject, signal } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { filter, first, take } from "rxjs";
import { HerosService } from "src/app/@shared/services/heros.service";
import { HeroFormComponent } from "./components/hero-form/hero-form.component";

@Component({
  selector: "app-heros-salon",
  templateUrl: "./heros-salon.component.html",
  styleUrls: ["./heros-salon.component.scss"],
})
export class HerosSalonComponent implements OnInit {
  private heroService: HerosService = inject(HerosService);
  private dialogService: MatDialog = inject(MatDialog);

  herosInfo = signal<any[]>([]);
  herosInfoAux = signal<any[]>([]);
  searchByHero = signal<boolean>(true);
  searchHero = new FormControl("", Validators.minLength(3));
  randomDesc = "This is a random description, where you can modify";
  showSearchButton = signal<boolean>(false);
  hero = "hero";
  herosLength = 0;
  lastIndex = 0;

  ngOnInit(): void {
    this.initHeroData();
    this.searchHero.valueChanges.subscribe((search: any) => {
      const lengthToSearch = this.searchByHero() ? 3 : 7;
      this.searchHero.setValidators(Validators.minLength(lengthToSearch));
      this.showSearchButton.set(this.searchHero.valid);
      if (search.length < lengthToSearch) {
        this.herosInfo.set(this.herosInfoAux());
      }
    });
  }

  initHeroData(): void {
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
      });
  }

  filterHeros(): void {
    if (this.searchByHero()) {
      this.herosInfo.set(
        this.herosInfo().filter((elem) =>
          elem.name.toLowerCase().includes(this.searchHero.value?.toLowerCase())
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
    this.searchByHero.set(event.value === "hero");
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

  openFormDialog(action: string, hero?: any): void {
    const heroIdAux = hero?.id;
    const dialogRef = this.dialogService.open(HeroFormComponent, {
      data: {
        type: action,
        heroeInfo: hero,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event === "edit") {
        this.editHeroes(result, heroIdAux);
      } else {
        if (result?.event === "add") {
          this.addHeroe(result.data);
        }
      }
    });
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
    };
    this.setHerosInfoPaged();
  }

  addHeroe(newHero: any): void {
    this.herosInfoAux.update((heroElem: any[]) => {
      const hero = {
        name: newHero.heroName,
        description: newHero.heroDescription,
        id: newHero.heroId,
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
