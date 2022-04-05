export default interface CRUD {
    create(e: Event): void;
    read(): void;
    update(e: Event): void;
    delete(oButton: any): void;
  }