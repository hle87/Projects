<React.Fragment>
  <div className="container">
    <div className="form-left">
      <div className=" form-group">
        <form>
          <div className="form-outline col-md-4">
            <label htmlFor="First Name">First Name</label>
            <input type="firstName" id="firstName" name="firstName" />
          </div>
          <div className="form-outline col-md-4">
            <label htmlFor="First Name">Last Name</label>
            <input type="lastName" id="lastName" name="lastName" />
          </div>
          <label htmlFor="currentVotes">Current Votes</label>
          <input type="currentVotes" id="currentVotes" name="currentVotes" />
          <div className="form-outline col-md-4">
            <label htmlFor="Select Element"> Party</label>
            <select type="party" id="party" name="party">
              <option value="">Pick</option>
              <option value="republican">republican</option>
              <option value="democrat">democrat</option>
              <option value="independent">independent</option>
            </select>
          </div>
          <div className="form-outline col-md-4">
            <label htmlFor="ImageUrl">Image Url</label>
            <input type="imageUrl" id="imageUrl" name="imageUrl" />
          </div>
          <button
            onClick={postPC}
            type="submit"
            id="submit"
            name="submit"
            className="btn btn-warning"
          >
            submit
          </button>
          <button
            onClick={resetData}
            type="reset"
            id="reset"
            name="reset"
            className="btn btn-outline-warning"
          >
            reset
          </button>
        </form>
      </div>
    </div>
    <div className="form-right">
      <div className=" form-group">
        <form>
          <div className="form-outline col-md-4">
            <label htmlFor="First Name2">First Name</label>
            <input type="firstName2" id="firstName2" name="firstName2" />
          </div>
          <div className="form-outline col-md-4">
            <label htmlFor="Last Name2">Last Name</label>
            <input type="lastName2" id="lastName2" name="lastName2" />
          </div>
          <label htmlFor="currentVotes2">Current Votes</label>
          <input type="currentVotes2" id="currentVotes2" name="currentVotes2" />
          <div className="form-outline col-md-4">
            <label htmlFor="Select Element"> Party</label>
            <select type="party2" id="party2" name="party2">
              <option value="">Pick</option>
              <option value="republican">republican</option>
              <option value="democrat">democrat</option>
              <option value="independent">independent</option>
            </select>
          </div>
          <div className="form-outline col-md-4">
            <label htmlFor="ImageUrl2">Image Url</label>
            <input type="imageUrl2" id="imageUrl2" name="imageUrl2" />
          </div>
          <button
            onClick={postPC}
            type="submit2"
            id="submit2"
            name="submit2"
            className="btn btn-danger"
          >
            submit2
          </button>
          <button
            onClick={resetData}
            type="reset"
            id="reset2"
            name="reset2"
            className="btn btn-outline-danger"
          >
            reset2
          </button>
        </form>
      </div>
    </div>
  </div>
  <div className="row">{renderP.render && pCandidate}</div>
  {/* <PoliticalCandidateCard></PoliticalCandidateCard> */}
</React.Fragment>;
