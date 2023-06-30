class Body {
    constructor() {
      if (new.target === Body) {
        throw new TypeError("Cannot instantiate abstract class.");
      }
      this.level = 1;
    }

    get color() {
      throw new Error("Property 'color' must be implemented.");
    }
  
    get type() {
      throw new Error("Property 'type' must be implemented.");
    }
    use() {
      throw new Error("Method 'use()' must be implemented.");
    }
  
    upgrade() {
      this.level++;
      console.log(`Upgraded to level ${this.level}.`);
    }

    remove(){
        return
    }
}

class GenericBody extends Body {
    constructor() {
      super();
    }
  
    get color() {
      return "gray";
    }
  
    get type() {
      return "generic";
    }
  
    get level() {
      return this.level;
    }
  
    use(){
      return
    }
}

class ScoreBody extends Body{
    constructor(){
        super();
        this.scoreInterval = setInterval()
    }


    get color(){
        return "red";
    }

    get type(){
        return 'score';
    }

    get level(){
        return this.level;
    }

    use(){

    }

    remove(){

    }
}

class MultiplierBody extends Body{
    constructor(){
        super();

    }

    get color(){
        return "green";
    }

    get type(){
        return 'multiplier';

    }

    get level(){
        return
    }

    use(){
        score = score * 2
        speed = speed * 2
    }

    upgrade(){
        return
    }
}

class ShieldBody extends Body{
    constructor(){
        super();
    }

    get color(){
        return 'blue';
    }

    get type(){
        return 'shield'
    }

    get level(){
        return
    }

    use(){
        protected = true;
    }

    remove(){
        protected = false;
    }
}


