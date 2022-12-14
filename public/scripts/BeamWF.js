class BeamWF{
    constructor(shape_data, Fy = 50, length){
        this.E = 29000 // ksi
        this.Fy = Fy;
        this.setLength(length);
        this.setShape(shape_data)
        // if (arguments.length > 0){
        //     this.setShape(shape_data)
        // }
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

        // console.log(shape_data)
        
        // For WF beams, c = 1.0 always
        this.c = 1; 

        // TODO: Add true Cb calc
        this.Cb = 1.0

        // Derived properties
        this.calcLp();
        this.calcLr();
        this.calcFcr();

        // Calc Capacity
        this.calcFactoredMoment()
    }

    // Set functions **********************************
    setFy(Fy){
        this.Fy = Fy;
        this.calcLp();
        this.calcLr();
        this.calcFcr();
        this.calcFactoredMoment();
    }

    setLength(beam_length){
        if (!this.Lb) {
            this.Lb = beam_length;
        }
        else {
            this.Lb = beam_length;
            this.calcFcr();
            this.calcFactoredMoment();
        }
    }

    // Properties Equations ***************************
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

    calcFcr(){
        if (this.Lb > 0){
            const Lb_sq = Math.pow((this.Lb * 12 / this.rts),2);
            const JoverS = this.J * this.c / (this.Sx * this.ho);  
            const sq = Math.sqrt(1 + 0.078 * JoverS * Lb_sq);
            this.Fcr = this.Cb * Math.pow(Math.PI,2) * this.E * sq / Lb_sq;
        }
    }

    calcLtbMoment(){
        if (this.Lb < this.Lp) {
            this.Mn_LTB = this.Mp;
        } 
        else if (this.Lb < this.Lr) {
            const ratio = (this.Lb - this.Lp) / (this.Lr - this.Lp);
            this.Mn_LTB = this.Cb * (this.Mp - (this.Mp - 0.7 * this.Fy * this.Sx) * (ratio));
        }
        else {
            this.Mn_LTB = this.Fcr * this.Sx;
        }
        return this.Mn_LTB;
    }

    // Beam Equations  ********************************
    calcPlasticMoment(){
        this.Mp = this.Zx * this.Fy;
        return this.Mp;
    }

    calcNominalMoment(){
        this.calcPlasticMoment();
        this.calcLtbMoment();
        this.Mn = Math.min(this.Mp, this.Mn_LTB);
        return this.Mn;
    }

    calcFactoredMoment(){
        // TODO: Verify phi factor of 0.9
        // TODO: Add a way to change 0.9
        this.phi = 0.9;
        this.calcNominalMoment();
        this.phiMn = this.phi * this.Mn / 12; //kip-ft
        return this.phiMn;
    }
}


export default BeamWF;