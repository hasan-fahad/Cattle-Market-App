import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-cattle',
  templateUrl: './cattle-form.component.html',
  imports: [FormsModule],
  styleUrls: ['./cattle-form.component.scss'],
})
export class AddCattleComponent {
  id: number | null = null;
  model = {
    id: null as number | null,
    breed: '',
    weight: null as number | null,
    price: null as number | null,
    age: null as number | null,
    available: true,
    image: '',
  };
  loading = false;
  errorMsg = '';
  apiUrl = 'https://cattle-backend.onrender.com/cattle';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadCattle(+id);
    }
  }

  loadCattle(id: number) {
    this.loading = true;
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.model = { ...data };
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load cattle details.';
        this.loading = false;
      },
    });
  }

  addCattle() {
    this.errorMsg = '';
    if (
      !this.model.breed ||
      !this.model.weight ||
      !this.model.price ||
      !this.model.age
    ) {
      this.errorMsg = 'Please fill all required fields.';
      return;
    }

    this.loading = true;

    if (this.model.id) {
      this.http.patch(`${this.apiUrl}/${this.model.id}`, this.model).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/cattle-list']);
        },
        error: () => {
          this.errorMsg = 'Failed to update cattle.';
          this.loading = false;
        },
      });
    } else {
      this.http.post(this.apiUrl, this.model).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/cattle-list']);
        },
        error: () => {
          this.errorMsg = 'Failed to add cattle.';
          this.loading = false;
        },
      });
    }
  }
}
