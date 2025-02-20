export default class Task {
  constructor(
    public title: string,
    public description: string,
    public status: string,
    public id?: number
  ) {}
}