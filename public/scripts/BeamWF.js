class BeamWF{
    constructor(shape_data, Fy = 50){
        this.E = 29000 // ksi
        this.Fy = Fy;
        if (arguments.length > 0){
            this.setShape(shape_data)
        }
    }
    // Setters 
    setShape(shape_data){
        this.name = shape_data.AISC_Manual_Label;

        // Properties pulled from AISC data
        this.Sx = parseFloat(shape_data.Sx);
        this.Zx = parseFloat(shape_data.Zx);
        this.Ix = parseFloat(shape_data.Ix);
        this.ry = parseFloat(shape_data.ry);
        this.J  = parseFloat(shape_data.J);
        this.ho = parseFloat(shape_data.ho);
        this.rts = parseFloat(shape_data.rts);

        console.log(shape_data)
        
        // TODO: Come back and make this a proper equation
        this.c = 1; 
        // Derived properties
        this.calcLp();
        this.calcLr();

        // Change later
    }

    setFy(Fy){
        this.Fy = Fy;
    }

    setLength(beam_length){
        this.beam_length = beam_length;
    }
    // Properties Equations
    calcLp(){
        this.Lp = 1.76 * this.ry * Math.sqrt(this.E/this.Fy) / 12; // feet
    }

    calcLr(){
        const JoverS = this.J * this.c / (this.Sx * this.ho);
        const EoverFy = this.E / (0.7 * this.Fy);
        const sq1 = Math.sqrt(Math.pow(JoverS,2) + 6.76 * Math.pow(1 / EoverFy,2));
        const sq2 = Math.sqrt(JoverS + sq1);
        this.Lr = 1.95 * this.rts * EoverFy * sq2 / 12; // feet
    }

    // Beam Equations
    calcPlasticMoment(){
        this.plasticMoment = this.zx * this.fy;
        return plasticMoment;
    }

    calcNominalMoment(){
        this.calcPlasticMoment();
        this.mn = Math.min(this.plasticMoment);
        return this.mn;
    }

    calcFactoredMoment(){
        // TODO: Verify phi factor of 0.9
        // TODO: Add a way to change 0.9
        this.phi = 0.9;
        this.calcNominalMoment();
        this.phiMn = this.phi * this.mn;
        return phiMn;
    }
}


export default BeamWF;