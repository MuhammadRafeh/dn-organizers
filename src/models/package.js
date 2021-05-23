class Package {
    constructor(id, name, price, theme, menu, venu) {
        this.id = id //This is a firebase assigned id;
        this.name = name;
        this.price = price;
        this.theme = theme;
        this.menu = menu; //[{id, name, price}, ....]
        this.venu = venu; //[{id, name, price}, ....]
        // this.occuredDate = occuredDate; //TODO UNcomment this 2 lines
        // this.noOfPeople = noOfPeople;
    }
}

export default Package;
