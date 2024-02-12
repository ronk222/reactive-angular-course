import { Injectable } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(
    private http: HttpClient
  ) { }

  loadAllCourses() : Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses')
      .pipe(
        map(res => res['payload']),
        shareReplay()
    )
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
    )
  }
}
