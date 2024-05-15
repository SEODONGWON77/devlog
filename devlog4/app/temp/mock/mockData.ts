export const tempPatentNumberMap = {
  "9292083": {
    queryNumber: "14290749",
    applicationNumber: "14290749",
    patentNumber: "9292083",
    country: "us",
    kind: "B2",
  },
  "9292084": {
    queryNumber: "13501735",
    applicationNumber: "13501735",
    patentNumber: "9292084",
    country: "us",
    kind: "B2",
  },
  "9292085": {
    queryNumber: "13539043",
    applicationNumber: "13539043",
    patentNumber: "9292085",
    country: "us",
    kind: "B2",
  },
  "9292086": {
    queryNumber: "14023780",
    applicationNumber: "14023780",
    patentNumber: "9292086",
    country: "us",
    kind: "B2",
  },
  "9292088": {
    queryNumber: "14449623",
    applicationNumber: "14449623",
    patentNumber: "9292088",
    country: "us",
    kind: "B2",
  },
  "9292089": {
    queryNumber: "13216953",
    applicationNumber: "13216953",
    patentNumber: "9292089",
    country: "us",
    kind: "B1",
  },
  "9292090": {
    queryNumber: "14008233",
    applicationNumber: "14008233",
    patentNumber: "9292090",
    country: "us",
    kind: "B2",
  },
  "9292091": {
    queryNumber: "14029381",
    applicationNumber: "14029381",
    patentNumber: "9292091",
    country: "us",
    kind: "B1",
  },
  "9292092": {
    queryNumber: "12682235",
    applicationNumber: "12682235",
    patentNumber: "9292092",
    country: "us",
    kind: "B2",
  },
  "9292093": {
    queryNumber: "13299958",
    applicationNumber: "13299958",
    patentNumber: "9292093",
    country: "us",
    kind: "B2",
  },
};

export const tempClaimResponse = {
  result: [
    {
      claimId: "00001",
      claimText:
        "1. An injection molding machine comprising:\na fixed platen on which a fixed mold is mounted;\na moveable platen disposed facing the fixed platen and installed moveably forward and backward by a toggle link, the moveable platen on which a moveable mold is mounted facing the fixed mold;\na base plate supporting the toggle link and installed moveably forward and backward;\na driving part for mold clamping to operate the toggle link;\na driving part for mold thickness adjustment to adjust a mold thickness by moving the base plate forward and backward in relation to the fixed platen; and\na control unit to calculate a movement distance gap′before a clamping process by controlling the driving part for mold thickness adjustment to move the base plate backward and then move the base plate forward to a target movement position based on a fold amount of the toggle link determined by a clamp force, and control the driving part for mold thickness adjustment using a value obtained by deducting the movement distance gap from the fold amount of the toggle link when producing a clamp force.",
      claimRefList: [],
    },
    {
      claimId: "00002",
      claimText:
        "제 1 항에 있어서, The injection molding machine according to claim 1, wherein the control unit:\ncalculates the movement distance gap as many as a predetermined number of times; and\ndetermines an average value as a final movement distance gap.",
      claimRefList: ["claim 1"],
    },
    {
      claimId: "00003",
      claimText:
        "제 1 항에 있어서, The injection molding machine according to claim 1, wherein the control unit:\nturns on the driving part for mold thickness adjustment to move the base plate forward to the target movement position; and\nwhen the base plate reaches the target movement position, turns off the driving part for mold thickness adjustment and determines a difference between a current position of the base plate and the target movement position as the movement distance gap.",
      claimRefList: ["claim 1"],
    },
    {
      claimId: "00004",
      claimText:
        "제 1 항에 있어서, The injection molding machine according to claim 1, wherein:\nthe driving part for mold thickness adjustment is, a 3-phase induction motor; and\nthe control unit collects measured information from a sensor which measures a number of rotations of the 3-phase induction motor, and calculates a position of the base plate.",
      claimRefList: ["claim 1"],
    },
    {
      claimId: "00005",
      claimText:
        " 제 1 항에 있어서, The injection molding machine according to claim 4, wherein the control unit controls the 3-phase induction motor by supplying power to the 3-phase induction motor or blocking the power supply through a magnetic contact.",
      claimRefList: ["claim 1"],
    },
    {
      claimId: "00006",
      claimText:
        "1항 내지 5항 The injection molding machine according to claim 1, wherein the control unit:\ncontrols the driving part for mold clamping and the driving part for mold thickness adjustment to fully unfold the toggle link so that the moveable mold comes into contact with the fixed mold and the toggle link becomes a folded state at a predetermined amount; and\ncontrols the driving part for mold thickness adjustment to move the base plate forward as much as a value obtained deducting the movement distance gap from the fold amount of the toggle link to produce a clamp force.",
      claimRefList: ["claim 1", "claim 2", "claim 3", "claim 4", "claim 5"],
    },
    {
      claimId: "00007",
      claimText:
        "1항 내지 5항 A mold thickness control method for an injection molding machine comprising a fixed platen on which a fixed mold is mounted, a moveable platen which is disposed facing the fixed platen and installed moveably forward and backward by a toggle link and on which a moveable mold is mounted facing the fixed mold, and a base plate which supports the toggle link and is installed moveably forward and backward, the mold thickness control method comprising:\nreceiving from a user an input of a fold amount of the toggle link determined by a clamp force;\nbefore a clamping process, calculating a movement distance gap by moving the base plate backward and moving the base plate forward to a target movement position based on the fold amount of the toggle link; and\nwhen producing a clamp force, moving the base plate forward using a value obtained by deducting the movement distance gap from the fold amount of the toggle link.",
      claimRefList: ["claim 1", "claim 2", "claim 3", "claim 4", "claim 5"],
    },
    {
      claimId: "00008",
      claimText:
        "제 7 항에 있어서, The mold thickness control method according to claim 7, wherein the calculating comprises:\ncalculating the movement distance gap as many as a predetermined number of times; and\ndetermining an average value as a final movement distance gap.",
      claimRefList: ["claim 7"],
    },
    {
      claimId: "00009",
      claimText:
        "제 2항 또는 제 4항에 있어서 The mold thickness control method according to claim 7, wherein the calculating comprises:\nturning on the driving part for mold thickness adjustment which moves the base plate forward and backwards, to move the base plate backward and then move the base plate forward to the target movement position;\nturning off the driving part for mold thickness adjustment when the base plate reaches the target movement position; and\ndetermining a difference between a current position of the base plate after turned off and the target movement position as the movement distance gap.",
      claimRefList: ["claim 2", "claim 4"],
    },
    {
      claimId: "00010",
      claimText:
        "제 9 항에 있어서, The mold thickness control method according to claim 7, wherein the calculating and the moving forward comprises:\nmoving the base plate using a 3-phase induction motor; and\ncollecting measured information from a sensor which measures a number of rotations of the 3-phase induction motor, and calculating a position of the base plate.",
      claimRefList: ["claim 9"],
    },
    {
      claimId: "00011",
      claimText:
        "제 10 항에 있어서, The mold thickness control method according to claim 10, wherein the 3-phase induction motor is controlled by supplying power to the 3-phase induction motor or blocking the power supply through a magnetic contact.",
      claimRefList: ["claim 10"],
    },
    {
      claimId: "00012",
      claimText:
        "제 7 항에 있어서 The mold thickness control method according to claim 7, wherein the moving forward comprises:\nfully unfolding the toggle link, so that the moveable mold comes into contact with the fixed mold;\ncontrolling the toggle link so that the toggle link becomes a folded state at a predetermined amount; and\nmoving the base plate forward as much as a value obtained deducing the movement distance gap from the fold amount of the toggle link to produce a clamp force.",
      claimRefList: ["claim 7"],
    },
  ],
};
