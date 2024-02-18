
import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com'; // Base URL for GitHub API

  constructor(private http: HttpClient) { }
  getUser(username: string): Observable<any> { // Method to fetch user data from GitHub API
    return this.http.get<any>(`${this.apiUrl}/users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

   // Method to fetch user repositories from GitHub API
  getUserRepositories(username: string, page: number, perPage: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos?page=${page}&per_page=${perPage}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) { // Method to handle HTTP errors
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
     
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 404) {
      errorMessage = `User not found`;
    } else if (error.status === 403) {
      errorMessage = `API rate limit exceeded. Please try again later.`;
    } else {
    
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
