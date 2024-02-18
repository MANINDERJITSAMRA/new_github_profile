
import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { GithubService } from '../github.service'; 

@Component({
  selector: 'app-user-profile', 
  templateUrl: './user-profile.component.html', 
  styleUrls: ['./user-profile.component.scss'] 
})
export class UserProfileComponent implements OnInit { 
  username: any; 
  userData: any;
  repositories: any[] = []; // Array to store user repositories
  currentPage: number = 1; 
  error: any;
  totalRepoCount: number = 0; 

  constructor(private route: ActivatedRoute, private githubService: GithubService) { } 

  ngOnInit(): void { 
    this.route.params.subscribe(params => { 
      this.username = params['username']; // Extract username from route parameters
      console.log('Username:', this.username); 
      this.fetchUserData(); // Call method to fetch user data
      this.fetchUserRepositories(); // Call method to fetch user repositories
    });
  }

  fetchUserData() { // Method to fetch user data from GithubService
    this.githubService.getUser(this.username).subscribe(data => { 
      this.userData = data; 
      this.totalRepoCount = data.public_repos; // Assign total public repositories count to totalRepoCount variable
    },
    error => { // Error handling
      this.error = error; 
    });
  }

  fetchUserRepositories() { // Method to fetch user repositories from GithubService
    this.githubService.getUserRepositories(this.username, this.currentPage).subscribe(data => { // Subscribe to getUserRepositories observable
      this.repositories = data; 
    },
     error => { // Error handling
      this.error = error; 
    });
  }

  onPageChange(pageNumber: number) { // Method to handle page change event
    this.currentPage = pageNumber; 
    this.fetchUserRepositories(); // Fetch user repositories for the new page
  }
}
