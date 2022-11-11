class BeamWF{
    constructor(shape_data, Fy = 50){
        if (arguments.length > 0){
            this.Fy = Fy;
            this.setShape(shape_data)
            // this.Zx = shape_data.Zx
            // this.Ix = shape_data.Ix
        }
    }

    setShape(shape_data){
        this.Zx = shape_data.Zx;
        this.Ix = shape_data.Ix;
    }

    setFy(Fy){
        this.Fy = Fy;
    }

    setLength(beam_length){
        this.beam_length = beam_length;
    }

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