import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class PostsService {
  constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
      return this.http.post<any>(`${environment.FbDbUrl}/posts.json`, post)
        .pipe(map((response:FbCreateResponse) => {
          return {      // возвращается пост с дженерик типом
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        }))
    }

    getAll(): Observable<any[]> {
    return this.http.get(`${environment.FbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response) // пробегаемся по респонс и получаем массив айдишников
          .map(key => ({//преобразовываем каждый обьект как обьект поста на фронте\тут возвращаем новый объект с помощью оператора спред
            ...response[key],//данные, которые относятся к посту
            id: key,
            date: new Date(response[key].date)
          }))
      }))
    }

    remove(id: string): Observable<void> {
      return this.http.delete<void>(`${environment.FbDbUrl}/posts/${id}.json`)
    }

    getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.FbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
    }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post)  //патч позволяет чатсично обновлять данные
  }

}
