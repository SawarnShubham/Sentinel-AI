const attackMemory = {};

const MAX_FAILED_LOGINS =
  Number(process.env.MAX_FAILED_LOGINS);

const BLOCK_DURATION_MS =
  Number(process.env.BLOCK_DURATION_MS);

const getAttackData = (ip) => {
  return attackMemory[ip] || {
    failedLogins: 0,
    blockedUntil: null,
  };
};

const recordFailedLogin = (ip) => {
  if (!attackMemory[ip]) {
    attackMemory[ip] = {
      failedLogins: 0,
      blockedUntil: null,
    };
  }

  attackMemory[ip].failedLogins += 1;

  if (
    attackMemory[ip].failedLogins >= MAX_FAILED_LOGINS
  ) {
    attackMemory[ip].blockedUntil =
      Date.now() + BLOCK_DURATION_MS;
  }
};

const resetAttackData = (ip) => {
  delete attackMemory[ip];
};

const isBlocked = (ip) => {
  const data = attackMemory[ip];

  if (!data || !data.blockedUntil) {
    return false;
  }

  if (Date.now() > data.blockedUntil) {
    delete attackMemory[ip];
    return false;
  }

  return true;
};

module.exports = {
  getAttackData,
  recordFailedLogin,
  resetAttackData,
  isBlocked,
};