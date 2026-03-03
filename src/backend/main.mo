import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    packageName : Text;
    travelDate : Text;
    numTravelers : Nat;
    message : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : { #less; #equal; #greater } {
      Text.compare(inquiry1.email, inquiry2.email);
    };
  };

  let subscribers = Map.empty<Text, ()>();
  let inquiries = Map.empty<Nat, Inquiry>();
  let searchTerms = Map.empty<Text, Nat>();

  var inquiryId = 0;

  public shared ({ caller }) func subscribe(email : Text) : async () {
    switch (subscribers.get(email)) {
      case (null) {
        subscribers.add(email, ());
      };
      case (?()) { Runtime.trap("Already subscribed") };
    };
  };

  public query ({ caller }) func getSubscriberCount() : async Nat {
    subscribers.size();
  };

  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    packageName : Text,
    travelDate : Text,
    numTravelers : Nat,
    message : Text,
  ) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      packageName;
      travelDate;
      numTravelers;
      message;
    };
    inquiries.add(inquiryId, inquiry);
    inquiryId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort();
  };

  public shared ({ caller }) func searchDestination(term : Text) : async Nat {
    let count = switch (searchTerms.get(term)) {
      case (null) { 0 };
      case (?existing) { existing };
    };
    let newCount = count + 1;
    searchTerms.add(term, newCount);
    newCount;
  };
};
