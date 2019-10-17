import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneratorService } from '../services/generator.service';
import { RandomizerService } from '../randomizer.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  private tabs: Tab[] = [
    { name: 'ROM Settings', route: 'rom-settings' },
    { name: 'Rules', route: 'rules' },
    { name: 'Logic', route: 'logic' },
    { name: 'History', route: '/history' }
  ];
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService, private generatorService: GeneratorService) { }

  ngOnInit() {
    this.randomizerService.form$.subscribe((form: RandomizerForm) => {
      if (form && form.seed) {
        this.form.patchValue({ seed: form.seed });
      }
    });

    this.createForm();
  }

  getForm(): FormGroup {
    return this.form;
  }

  getTabs(): Tab[] {
    return this.tabs;
  }

  generateSeed() {
    this.generatorService.generateSeed();
  }

  createForm() {
    const fb = new FormBuilder();

    this.form = fb.group({
      seed: ['']
    });

    this.randomizerService.replaceForm('randomizer', this.form);
  }
}

interface Tab {
  name: string;
  route: string;
}
